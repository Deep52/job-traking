PGDMP     #    1                z           job-tracking    14.1    14.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
    create_date character varying(100) NOT NULL
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
    admintype character varying(6)
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
   TABLE DATA           �   COPY public.addjob (id, company_name, job_tittle, qualified, failed_in, resume_name, feedback, response_feedback, user_id, response, create_date) FROM stdin;
    public          postgres    false    216   ]#       
          0    33071    course 
   TABLE DATA           M   COPY public.course (id, course_full_name, couse, dept_id, level) FROM stdin;
    public          postgres    false    214   (                 0    33063 
   department 
   TABLE DATA           F   COPY public.department (id, dept_full_name, dept, s_date) FROM stdin;
    public          postgres    false    212   �(                 0    33043    login 
   TABLE DATA           �   COPY public.login (id, fname, lname, email, password, type, salt, twofa, access, start_date, typebyadmin, department, course, admintype) FROM stdin;
    public          postgres    false    210   �(                 0    49441    reply_response 
   TABLE DATA           �   COPY public.reply_response (id, reply_by_student, reply_by_professor, user_id, job_id, user_name, prof_name, date, time_r, count1, count2) FROM stdin;
    public          postgres    false    218   �*                  0    0    addjob_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.addjob_id_seq', 82, true);
          public          postgres    false    215                       0    0    course_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.course_id_seq', 8, true);
          public          postgres    false    213                       0    0    department_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.department_id_seq', 7, true);
          public          postgres    false    211                       0    0    login_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.login_id_seq', 24, true);
          public          postgres    false    209                       0    0    reply_response_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.reply_response_id_seq', 43, true);
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
       public            postgres    false    218               �  x���[o�6���_A`/ۃK�?n�VÊ�	�(`P�H�Fy�$+��;��4v�ҭ��������x�-����\�GV��}NC�M�Y:}mI��P���=�=���O盩?��n��'�!�E�
�����o`v��5i��!�Mu�����Ӫ�r�aں�Ɵ���o��(��o�~"�ǀ,��Bi+HS������VY��r�)^.k�Җ������
��Z{�C���پ^�DZQae J
E�H��H+���Kh�ڽc�,�fE9;�j4N���B�`*g-C�2T��O�"��O?`v� B�7϶3��6PV^p�Z��vD�2�$I+UUIg,7pn
���99
u,�)�n��Cv;�"G���+��2�,wS1�?hA��<�t^E:E<y�Ɲ�#���)�PK�V}�dB�Yk��v�"�hU-i�ܼ��E��P�zDV_��%�9���h9�a���1wP4ѵ�?T|q���W�ݚ6P��zD+(�(au3a�<�t��m�DOY	�^��?y���)��r��iQ���S��g�uh�@X���C��������;�u"��w�Dݙ5xpX��s�G$����ұ?��q����f��I+�Ea�<<��SH]���Ǆmz�B; �PzW��a�{dye-������ݧϿ~B�[bU�zNEa���}3	�jhr͓>�x�tt+�	�s�Kh�pG^%��P�7�����-�E�z12o	�!��ҍ�^��0՛z󩿡?{��F��[�N9�,9����U���Mw4�#ӡ���d�؆D ��~��5ћl�щ>y���r㫽:T�c-��ҜdO�;�L�=�]*�q���+�P���e	幩CS�+DhfeS���,��Z�;�B�D�X�l�k�����2KgK���9k� ��u��]L�K�	���U��BK?����W�>��4��܍����cn�sn��PD5t04���������;�ٖp���}}�s7~e��ԑQ4{�E�eF�+X�sՅ�S�i_���K��z'Ay���m�(�D�4*)���oZo&[������}_�=��o�d.��.��]����fz��?Yn~��:B�P������Gt���Z&���QҜ�Yl�X��2�-���z���sL�E%�,*��"��xx��9-��m� TH���Yz��&_g���_�      
   f   x�3��vVpL)K�KNUp��-(-I-RN�L
@$��99ܹ��\�j`J��<�ĒDi���oq��Siqf^jq��ob^bzjnj^	Dܗ��*F��� s�+\         T   x�3�t��-(-I-RN�L�KN�t��4202�50�50�2�t*-��K-.��urD�Xrsz�&�d�t*pz��p%F&\1z\\\ gwt         �  x����n[1Fg�)�1DJ��-n��f�(25R��ڷ@���FѠE3d�A:�w�)<�4���m>�Γ�U�h��� �o=�!Uq��5�(��(��V#WV��PZ��h�HХZ����1X�nS�������
%�<�b�����t8�W��;��Q�vd�]a�7�|�.�~���s��M6���-@gFU�L��%ku��Ƚ�e���Ю��2��zmCZ�T��<�x�ba+�LQsbU1v���F�Tz��v��|��r	�]�Y��(�v�������tϮ�(�Wf�pm@�V���z"��!9K�c��Ik���/����1p٪-�d@�5R�X�-������<�>�ޜ�eH� W�1zu��r��U1�L�b�\��.So�Rx�XĠ'�Q41&��|�14��>� 7��?����]�y�A���f�Z���b         �  x���Mr�0���)t�L�0h���d�����R9El�>AL�f"g��=�{�$*@wz��A�U�����:�q�Z2�T�X�?%k$o�χ}A+�t�&jo\� 璖I��Ȥc6,�	ށ�b�1dӵu�@2=��BH��B��~�x��+�J���e��*�vW�>̊47p��>;�j'Y���<��d��������oe�^A�!bߢ�2��8A�"�q�$�}Kc\t�h!�5KaJ8��>�@e�,k�#�hT��쿍���t%1���ӵ�i{����n��3�)����

x!�ZC��ц���N�B	h<���/j�������Vm�-I���'��.��A���n).j7{:sv6���P���6�9'���r�J��'{T������-�i��@�>��쐤�_�*
Q���3c�Q&�JR�)����U3O�@�dPoĨ��xM����)ip��x6�7siq[X��=�*��0��\     