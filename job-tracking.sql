PGDMP                         z           job-tracking    14.1    14.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24850    job-tracking    DATABASE     s   CREATE DATABASE "job-tracking" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United Kingdom.1252';
    DROP DATABASE "job-tracking";
                postgres    false            �            1259    41267    addjob    TABLE     �  CREATE TABLE public.addjob (
    id integer NOT NULL,
    company_name character varying(250),
    job_tittle character varying(250),
    qualified character varying(50),
    failed_in character varying(150),
    resume_name character varying(200),
    feedback character varying(2000),
    response_feedback character varying(2000),
    user_id integer NOT NULL,
    response "char" NOT NULL,
    create_date character varying(100) NOT NULL,
    prof_name character varying(150)
);
    DROP TABLE public.addjob;
       public         heap    postgres    false            �            1259    41266    addjob_id_seq    SEQUENCE     �   ALTER TABLE public.addjob ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.addjob_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    216            �            1259    33071    course    TABLE     �   CREATE TABLE public.course (
    id integer NOT NULL,
    course_full_name character varying(300),
    couse character varying(200),
    dept_id integer NOT NULL,
    level character varying(200) NOT NULL
);
    DROP TABLE public.course;
       public         heap    postgres    false            �            1259    33070    course_id_seq    SEQUENCE     �   ALTER TABLE public.course ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.course_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    214            �            1259    33063 
   department    TABLE     �   CREATE TABLE public.department (
    id integer NOT NULL,
    dept_full_name character varying(200) NOT NULL,
    dept character varying(200) NOT NULL,
    s_date character varying(200)
);
    DROP TABLE public.department;
       public         heap    postgres    false            �            1259    33062    department_id_seq    SEQUENCE     �   ALTER TABLE public.department ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.department_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    212            �            1259    33043    login    TABLE     �  CREATE TABLE public.login (
    id integer NOT NULL,
    fname character varying(250),
    lname character varying(250),
    email character varying(250),
    password character varying(400),
    type character varying(200),
    salt character varying(200),
    twofa boolean,
    access integer NOT NULL,
    start_date character varying(200),
    typebyadmin "char",
    department character varying(250),
    course character varying(250),
    admintype character varying(15)
);
    DROP TABLE public.login;
       public         heap    postgres    false            �            1259    33042    login_id_seq    SEQUENCE     �   ALTER TABLE public.login ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.login_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    210            �            1259    49441    reply_response    TABLE     �  CREATE TABLE public.reply_response (
    id integer NOT NULL,
    reply_by_student character varying(1000),
    reply_by_professor character varying(1000),
    user_id integer NOT NULL,
    job_id integer NOT NULL,
    user_name character varying(200),
    prof_name character varying(200),
    date character varying(100),
    time_r character varying(100),
    count1 integer,
    count2 integer
);
 "   DROP TABLE public.reply_response;
       public         heap    postgres    false            �            1259    49440    reply_response_id_seq    SEQUENCE     �   ALTER TABLE public.reply_response ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reply_response_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    218                      0    41267    addjob 
   TABLE DATA           �   COPY public.addjob (id, company_name, job_tittle, qualified, failed_in, resume_name, feedback, response_feedback, user_id, response, create_date, prof_name) FROM stdin;
    public          postgres    false    216   �#       
          0    33071    course 
   TABLE DATA           M   COPY public.course (id, course_full_name, couse, dept_id, level) FROM stdin;
    public          postgres    false    214   �)                 0    33063 
   department 
   TABLE DATA           F   COPY public.department (id, dept_full_name, dept, s_date) FROM stdin;
    public          postgres    false    212   *                 0    33043    login 
   TABLE DATA           �   COPY public.login (id, fname, lname, email, password, type, salt, twofa, access, start_date, typebyadmin, department, course, admintype) FROM stdin;
    public          postgres    false    210   �*                 0    49441    reply_response 
   TABLE DATA           �   COPY public.reply_response (id, reply_by_student, reply_by_professor, user_id, job_id, user_name, prof_name, date, time_r, count1, count2) FROM stdin;
    public          postgres    false    218   .                  0    0    addjob_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.addjob_id_seq', 89, true);
          public          postgres    false    215                       0    0    course_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.course_id_seq', 9, true);
          public          postgres    false    213                       0    0    department_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.department_id_seq', 8, true);
          public          postgres    false    211                       0    0    login_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.login_id_seq', 29, true);
          public          postgres    false    209                       0    0    reply_response_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.reply_response_id_seq', 60, true);
          public          postgres    false    217            w           2606    41271    addjob addjob_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.addjob
    ADD CONSTRAINT addjob_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.addjob DROP CONSTRAINT addjob_pkey;
       public            postgres    false    216            u           2606    33077    course course_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.course DROP CONSTRAINT course_pkey;
       public            postgres    false    214            s           2606    33069    department department_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.department DROP CONSTRAINT department_pkey;
       public            postgres    false    212            q           2606    33047    login login_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.login DROP CONSTRAINT login_pkey;
       public            postgres    false    210            y           2606    49445 "   reply_response reply_response_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.reply_response
    ADD CONSTRAINT reply_response_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.reply_response DROP CONSTRAINT reply_response_pkey;
       public            postgres    false    218               �  x���I��6�Ϝ_A���`Ò���N�`42� ���Z+j��<R�x,��e@������(w��B*��:����������E&
��ݽ���t��A��Nїw�u�-\w����|u�Q���X��ҒuȚ�@����"f����Q�|��X(�ԭdA�oV$�z9��Ӛ���[�(��5@����\I��
�QԔ��X��b�9���1�}n}U��0������������t����H�^6����Q�%ڣ/&��Q���V+����A�����F�TYh����T"������@���/��>$�?��]�*_6%W��`�'���W���U����.U*�=�@�a@��S�H��˂q+o�8Z8��l刂?������5���	5����`�\5�_�2��E���^^��j9�>�
�ҙ9����� G{����lL���LTE�r�
�����|��Ԇ�K�c�ί���	�Sb��5�ױn�yH�8�P�xn�<&�U�7R�eV�J���wu��A��,-�����-A&%a"2:���q��=��}>����ڹ,�x��;������St|ţg�'�(q�!S�����m��
S(�6��`�.��)�@
��"�I�p&a�(x�ĥ��7�T�J��fk�>��V���̏��9S&y��a*p�#!&)��`H[���_A�)	��qX��Y��4�c��pXb�z��I���A����w���^'�DG�kA�`��6w�ϳ=]Ӈ7?ׇvL����]sw�I��n[Eh}�Ug����>���4�@���B���#T|x���?`gH4��< �����4$�p����jܨ/.W0�X@�JƔhk0t���'��fq��S'gvc�<>v�J���v�l5�Y�Rڄ<�F�(��r�Zu��l���a�f�d�uc�󊹍�HR��Lzc�RV*VN�B��N�k��������<+���<�к�EG�@D��Ge��1.\b��8�"]Q�����40���(9{K��f�B5T��f�Y,9��r�y�vTEU\����[�J��'��i��q����,�^��[�Tk����N����r��C��c6t�c[�P���Ȭ�hl�q"X�������N_m�*D	,̓�c�o���g�*���B�!�ꂹ�}��> ��;W�����O~���\����0*}qFo��߈�t4w�"񈢃�Q�<�/��!��qg��c[O?�y�k��`(=�D�o/<
��g���q_�q�q<�DEQ���K��3ڟ-ň�ԍaS��z���G�e9PvH�A�(�DUE�D�2�W�XDo��+�8:c{�E !�U2�BOh<��S(��^o��I����ř��Z^�Ã�k|͍��]*n;1�N$u�Cm�?}n<�Y�~�X���s-�8��������0ϧ��|�c�?�G�����x�г��s�j�"�id���b'�л������W���
      
   z   x�3��vVpL)K�KNUp��-(-I-RN�L
@$��99ܹ��\�j`J��<�ĒDi���oq��Siqf^jq��ob^bzjnj^	Dܗ��ʒ3�KLI)�ϩTH��
8-@�1z\\\  [3�         g   x�3�t��-(-I-RN�L�KN�t��4202�50�50�2�t*-��K-.��urD�Xrsz�&�d�t*pz��p%F&\�I��9��
 T�B���+F��� ry          a  x����nG�ϭ��X ��7+����B�IY��v�N���N�u� vNӳ?�*�������!�;��>=���w�o�������%�ڕٹ�����I(��G��NE�A<Z�\ת���+��uw�K�q��BnP�&��NH�Qǖ޼N���A�=]��w�G۟_��Զ�\_�QI������p>���#|����h|�zq|�P�$U��B�ajw�P�.�a[���R�Z�
�6���cHi����q��1��6��jJZ�T� �E�V�MT���z�N?�;;ҫ���us��w|cw�3_�	����b��֖����{� ���Tй�*�q�1��\_\�;�lX�Jk����e���k�����_]�8�\8��ODsF5�����_��o����p��T�IR��\в�,C�N/}ĈGlaƞG�Vr5)1ګ���(���N`XE�{.��lQ+�!v�E6?����!]=I�ODK�є~�H���Í�|�|���`��a< ���H��s���QǢ����s_տs�r��I��P���f�UNs���{s����%�w������v=q�(�5܋hkZ,k/C2b�%��1�^(]�p��E%�j'9���UbC;ClE�]�0bK�;G#����>��[������"s/ �y����`:��ɦ�0��F�oϹW���A�%ܪ/�
�HC������B�����'#��A�բ*E������C��E?ur(��E@֢F���/؀j��рeJD���UК�h6�6�aC��H��ű��>'�ZD���RG�"�`�Z���'n �;m��z�N^u�-�n�V��u[}��);�:�iv�y�\�����t��         F  x���ˎ�0���)�T�-o����*�� �1��!�A!	Ч�o'�3�0f�Y�"���r|L8*7��<#J'��1�zhT�f�.�Ւ�涅d���� ]Jg�XZ]�
0&Ir4:|)�d�K�#�B�et���\�<�r�e�Js.)��m*]?и��3O3��Mr�BHhwf��,�uCզ�6ydb%i�e��е�t2^�[�U@���_K�".�X��6��D"	T�0("
�ߜ��j����hXZ�V Q���ADF��5�w��J�)����,{��>��a:�$n��з����ה�|��� GO����m��qg��+Ɓ⨠�K�N6����
�!������jU�����{� A q`�bҀk�7�F��V��0���=�F�)��[���M9���FR,3�H	�g\�r۔��t���CN��Avp�Wx�N��T	o�$X��m�2����`L��o�����O	�����ߞ`���v�zNX{����h: 	��[��:mu:��)B��a�]���|_!N?�q �B;l�h�k7�����s�r���9qc晒����#I�y�0T>/����v���w< N�����.�׊�s�;]~�mF%�T*}��� �Po��O����Z�F_��i.���0�<���}�$�Q���k;t�kwjU��;�l�[gB>�ɼ�1b*�3�\�/�=��94�5����	`�$���R^Lپ�{�
̆��=��ZWS4���E�*N�����*�$s� �/Lx��ʚ���vs�-ރ��!�����|�\���)���D'���'%��Dç7Ѕ7��_>-�_$@��     